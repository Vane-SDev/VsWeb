// Archivo: src/components/WhatsAppButton.jsx (Versión Final Full-Stack)

import React, { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import './WhatsAppButton.css';
import { conversationFlow } from './conversationFlow.js';
import { knowledgeDocs } from './knowledgeDocs.js';
import { useProactiveTooltip } from '../hooks/useProactiveTooltip';
import { findNextStep, buildWhatsAppSummary } from './botLogic.js';
import { activePromotion } from './promotions.js';

const phoneNumber = '5492645207128';

const WhatsAppButton = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [collectedData, setCollectedData] = useState({});
    const [currentStepId, setCurrentStepId] = useState(null);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [promoOffered, setPromoOffered] = useState(false);

    const chatEndRef = useRef(null);
    const lastBotIntent = useRef(null);
    const showTooltip = useProactiveTooltip({});
    const emailSentRef = useRef(false);

    const collectedDataRef = useRef(collectedData);
    useEffect(() => {
        collectedDataRef.current = collectedData;
    }, [collectedData]);

    const addMessage = React.useCallback((text, sender) => {
        setMessages(prev => [...prev, { text, sender }]);
    }, []);

    const sendEmailSummary = React.useCallback(async (data) => {
        const endpoint = '/.netlify/functions/send-email';
        const emailPayload = {
            userName: data.userName || 'No especificado',
            email: data.email,
            businessType: data.businessType || 'No especificado',
            mainGoal: data.mainGoal || 'No especificado',
            initialQuery: data.initialQuery || 'No especificado',
        };
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailPayload),
            });
            if (!response.ok) {
                console.error('El backend devolvió un error al enviar el email.');
                addMessage('Hubo un problema al enviar el resumen. Por favor, contacta a Vane directamente.', 'bot');
            }
        } catch (error) {
            console.error('Error de red al contactar el backend:', error);
            addMessage('Hubo un problema de conexión al enviar el resumen. Por favor, contacta a Vane directamente.', 'bot');
        }
    }, [addMessage]);

    useEffect(() => {
        if (!isChatOpen || !currentStepId) return;
        const currentStep = conversationFlow[currentStepId];
        if (!currentStep) return;

        if (currentStepId === 'confirm_email_sent' && !emailSentRef.current) {
            sendEmailSummary(collectedDataRef.current);
            emailSentRef.current = true;
        }

        const now = new Date();
        if (activePromotion && now.getMonth() === activePromotion.month && now.getFullYear() === activePromotion.year && !promoOffered && (currentStepId === 'offer_email_summary' || currentStepId === 'pre_redirect_summary') && collectedDataRef.current.userName && collectedDataRef.current.email) {
            setPromoOffered(true);
            setCurrentStepId(activePromotion.entryStepId);
            return;
        }

        const processStep = async () => {
            if (currentStep.message || currentStep.messages) {
                setIsBotTyping(true);
                const messageList = Array.isArray(currentStep.messages) ? currentStep.messages : [currentStep.message];
                for (const msgOrFn of messageList) {
                    await new Promise(resolve => setTimeout(resolve, 1200));
                    const messageText = typeof msgOrFn === 'function' ? msgOrFn(collectedDataRef.current) : msgOrFn;
                    if (typeof messageText === 'string') {
                        addMessage(messageText.replace(/\{userName\}/g, collectedDataRef.current.userName || 'amig@'), 'bot');
                    }
                }
                setIsBotTyping(false);
            }
            if (currentStep.type === 'bot_message' && currentStep.nextStepId) {
                setTimeout(() => setCurrentStepId(currentStep.nextStepId), 1000);
            } else if (currentStep.type === 'redirect') {
                const finalMessage = buildWhatsAppSummary(collectedDataRef.current);
                setTimeout(() => { window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`, '_blank', 'noopener,noreferrer'); handleCloseChat(); }, 1500);
            } else if (currentStep.type === 'redirect_simple') {
                const finalMessage = `¡Hola! Vengo desde el chat de tu web y quisiera hacerte una consulta.`;
                setTimeout(() => { window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`, '_blank', 'noopener,noreferrer'); handleCloseChat(); }, 1500);
            }
        };
        processStep();
    }, [currentStepId, isChatOpen, promoOffered, sendEmailSummary, addMessage]);

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    const handleUserInputSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        const userMessage = userInput.trim();
        addMessage(userMessage, 'user');
        setUserInput('');
        const context = { currentStepId, lastBotMsg: messages.filter(m => m.sender === 'bot').slice(-1)[0]?.text?.toLowerCase() || '', lastBotIntent: lastBotIntent.current };
        const decision = findNextStep(userMessage, context);
        if (decision.response || decision.topicId) {
            setIsBotTyping(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            if (decision.response) {
                const responseText = typeof decision.response === 'function' ? decision.response({ currentStepId, userName: collectedData.userName }) : decision.response;
                addMessage(responseText.replace(/\{userName\}/g, collectedData.userName || 'amig@'), 'bot');
            }
            if (decision.topicId && knowledgeDocs[decision.topicId]) { addMessage(knowledgeDocs[decision.topicId], 'bot'); }
            setIsBotTyping(false);
        }
        if (decision.intent) { lastBotIntent.current = decision.intent; }
        if (decision.dataToUpdate) { setCollectedData(prev => ({ ...prev, ...decision.dataToUpdate })); }
        if (decision.nextStepId) { setCurrentStepId(decision.nextStepId); }
    };

    const handleOptionClick = (option) => {
        const currentStep = conversationFlow[currentStepId];
        addMessage(option.text, 'user');
        setCollectedData(prev => ({ ...prev, [currentStep.variableName]: option.text }));
        setCurrentStepId(option.nextStepId);
    };

    const handleOpenChat = () => {
        if (!isChatOpen) {
            setMessages([]);
            setCollectedData({});
            setPromoOffered(false);
            emailSentRef.current = false;
            setIsChatOpen(true);
            setCurrentStepId('start');
        }
    };
    const handleCloseChat = () => setIsChatOpen(false);
    const currentStep = conversationFlow[currentStepId] || {};

    return (
        <>
            <button onClick={handleOpenChat} className="whatsapp-float-button glass-effect" aria-label="Abrir chat con asistente virtual">
                <FaWhatsapp className="whatsapp-icon" />
                {showTooltip && (
                    <span className="whatsapp-tooltip show">¿Necesitas ayuda?</span>
                )}
            </button>
            {isChatOpen && (
                <div className="whatsapp-chat-popup">
                    <div className="chat-header">
                        <h3>Asistente Virtual</h3>
                        <button onClick={handleCloseChat} className="chat-close-button">&times;</button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        ))}
                        {isBotTyping && <div className="message bot typing-indicator"><span></span><span></span><span></span></div>}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="chat-interaction-area">
                        {currentStep.type === 'user_options' && !isBotTyping && currentStep.options && (
                            <div className="chat-options">
                                {(typeof currentStep.options === 'function' ? currentStep.options(collectedData) : currentStep.options).map((opt, i) => (
                                    <button key={i} onClick={() => handleOptionClick(opt)} className="chat-option-button">{opt.text}</button>
                                ))}
                            </div>
                        )}
                        {(currentStep.type === 'user_input' || currentStep.type === 'user_options' || !currentStep.type) && !isBotTyping && (
                            <form onSubmit={handleUserInputSubmit}>
                                <input id="user-chat-input" type="text" placeholder="Escribe aquí..." value={userInput} onChange={(e) => setUserInput(e.target.value)} autoComplete="off" autoFocus />
                                <button type="submit" aria-label="Enviar mensaje"><FaPaperPlane /></button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default WhatsAppButton;