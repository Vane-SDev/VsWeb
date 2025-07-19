// Archivo: netlify/functions/send-email.js

// En el backend (Node.js), usamos 'require' para importar librerías
const nodemailer = require("nodemailer");

// Todas las funciones de Netlify deben tener esta estructura.
// Es una función asíncrona que se ejecuta cada vez que se la llama.
exports.handler = async (event) => {
  // 1. Medida de seguridad: solo aceptamos peticiones de tipo POST.
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 2. Extraemos los datos que nos envió el bot desde el frontend.
    // Vienen como un string, así que los convertimos a un objeto JavaScript.
    const data = JSON.parse(event.body);

    // 3. Configuramos el "transportador" de Nodemailer.
    // Es como decirle a nuestro cartero cómo entrar a la oficina de correos de Zoho.
    // Usamos variables de entorno para no exponer datos sensibles en el código.
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com", // Servidor SMTP de Zoho
      port: 465,
      secure: true, // Usar conexión segura (SSL)
      auth: {
        user: process.env.ZOHO_EMAIL, // Tu email (lo configuraremos en Netlify)
        pass: process.env.ZOHO_APP_PASSWORD, // Tu contraseña de aplicación (lo configuraremos en Netlify)
      },
    });

    // 4. Creamos el contenido del email usando una plantilla HTML.
    // Aquí puedes poner todo el estilo y detalle que quieras.
    const emailHtml = `
            <div style="font-family: sans-serif; line-height: 1.6;">
                <h3>¡Nueva consulta desde el Asistente Virtual!</h3>
                <p>Hola Vane,</p>
                <p>Has recibido un nuevo lead cualificado a través del bot de tu sitio web. Aquí están los detalles:</p>
                <ul style="list-style-type: none; padding: 0;">
                    <li><strong>Nombre:</strong> ${
                      data.userName || "No especificado"
                    }</li>
                    <li><strong>Email:</strong> ${
                      data.email || "No especificado"
                    }</li>
                    <li style="margin-top: 8px;"><strong>Tipo de Negocio:</strong> ${
                      data.businessType || "No especificado"
                    }</li>
                    <li><strong>Objetivo Principal:</strong> ${
                      data.mainGoal || "No especificado"
                    }</li>
                    <li style="margin-top: 8px;"><strong>Consulta Inicial:</strong> <i>"${
                      data.initialQuery || "No especificado"
                    }"</i></li>
                </ul>
                <hr>
                <p><strong>Próximos Pasos Sugeridos:</strong></p>
                <p>Contacta a esta persona pronto para agendar una llamada de descubrimiento.</p>
                <br>
                <p style="font-size: 12px; color: #888;">Este es un email automático generado por tu asistente virtual Arya.</p>
            </div>
        `;

    // 5. Definimos los detalles del correo (destinatario, asunto, etc.)
    const mailOptions = {
      from: `"Arya, tu Asistente Virtual" <${process.env.ZOHO_EMAIL}>`, // Se enviará desde tu email
      to: data.email, // Le enviamos una copia al cliente
      bcc: process.env.ZOHO_EMAIL, // Y una copia oculta para ti
      subject: `Resumen de tu consulta con VS Web Design`,
      html: emailHtml,
    };

    // 6. Enviamos el email
    await transporter.sendMail(mailOptions);

    // 7. Devolvemos una respuesta de éxito al frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email enviado con éxito" }),
    };
  } catch (error) {
    // 8. Si algo falla, lo registramos y devolvemos un error
    console.error("Error al enviar email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Hubo un problema al enviar el email." }),
    };
  }
};
