import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos
    
    //? Enviar EMAIL
    await transport.sendMail( {
        from:' Bienes Raices',
        to: email,
        subject: 'Confirma tu Cuenta en Bienes Raices',
        text: 'Confirma tu cuenta en Bienes Raices',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en Bienes Raices <p>
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirma tu cuenta en Bienes Raices</a>
            <p>Si tu no creaste esta cuentam, puedes ignorar este Mensaje
        `
    })

}

export {
    emailRegistro,
}