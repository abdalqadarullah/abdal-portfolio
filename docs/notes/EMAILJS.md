# EmailJS Template

## Tujuan

Template ini digunakan oleh contact form pada section **LET'S WORK TOGETHER** di website ABDAL.

Contact form mengirim tiga parameter berikut melalui EmailJS:

| Parameter | Sumber | Keterangan |
|---|---|---|
| `from_name` | Field Nama | Nama pengirim |
| `from_email` | Field Email | Email pengirim |
| `message` | Field Pesan | Isi pesan atau detail proyek |

Checkbox consent hanya menjadi validasi di sisi website. Nilainya tidak dikirim sebagai parameter EmailJS.

## Konfigurasi EmailJS

Di EmailJS, buat satu email service lalu buat email template baru dengan konfigurasi berikut.

### To email

```text
abdalnasution63@gmail.com
```

### Subject

Salin subject berikut ke field **Subject**:

```text
New portfolio inquiry from {{from_name}}
```

### From name

```text
ABDAL Portfolio Contact Form
```

### From email

Gunakan email bawaan EmailJS atau alamat email service yang sudah terverifikasi. Jangan gunakan `{{from_email}}` sebagai alamat pengirim karena dapat menyebabkan masalah SPF atau DKIM.

### Reply to

```text
{{from_email}}
```

Dengan konfigurasi ini, tombol **Reply** pada email akan langsung membalas email pengunjung.

## Email body

Salin isi berikut ke field **Content** atau **Message** pada template EmailJS:

```text
NEW PORTFOLIO INQUIRY
=====================

You received a new message from the ABDAL portfolio contact form.

SENDER
------
Name: {{from_name}}
Email: {{from_email}}

MESSAGE
-------
{{message}}

---------------------
This message was sent from the ABDAL portfolio website.
Reply directly to this email to contact the sender.
```

## Versi HTML opsional

Jika template EmailJS menggunakan mode HTML, gunakan isi berikut:

```html
<div style="font-family: Arial, Helvetica, sans-serif; color: #0A0A0A; background: #FAFAFA; padding: 32px;">
  <div style="max-width: 640px; margin: 0 auto; border: 2px solid #0A0A0A; background: #FAFAFA;">
    <div style="background: #D4FF00; padding: 24px; border-bottom: 2px solid #0A0A0A;">
      <p style="margin: 0 0 8px; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">
        ABDAL Portfolio
      </p>
      <h1 style="margin: 0; font-size: 32px; line-height: 1; text-transform: uppercase;">
        New Inquiry
      </h1>
    </div>

    <div style="padding: 24px;">
      <h2 style="margin: 0 0 16px; font-size: 18px; text-transform: uppercase;">
        Sender
      </h2>
      <p style="margin: 8px 0;"><strong>Name:</strong> {{from_name}}</p>
      <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:{{from_email}}">{{from_email}}</a></p>

      <h2 style="margin: 32px 0 16px; font-size: 18px; text-transform: uppercase;">
        Message
      </h2>
      <div style="white-space: pre-wrap; border-left: 4px solid #D4FF00; padding: 16px; background: #F0F0F0; line-height: 1.6;">
        {{message}}
      </div>
    </div>

    <div style="border-top: 2px solid #0A0A0A; padding: 16px 24px; font-size: 12px; color: #6B6B6B;">
      Sent from the ABDAL portfolio website.
    </div>
  </div>
</div>
```

## Required EmailJS variables

Set the following variables in the local `.env` file and in Vercel under the **Production** environment:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_service_id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_template_id"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_public_key"
```

The project reads these variables in `src/components/sections/CTA.tsx` and calls:

```ts
emailjs.send(
  SERVICE_ID,
  TEMPLATE_ID,
  {
    from_name: name,
    from_email: email,
    message,
  },
  PUBLIC_KEY
);
```

## Recommended EmailJS settings

- Enable the template for the EmailJS service connected to the project.
- Set **To email** to `abdalnasution63@gmail.com`.
- Set **Reply to** to `{{from_email}}`.
- Keep the EmailJS public key in a `NEXT_PUBLIC_` variable; it is designed to be exposed in browser code.
- Do not place private SMTP passwords or server credentials in `.env` values prefixed with `NEXT_PUBLIC_`.
- Send a test email from the EmailJS template editor before testing through the website.

## Website test checklist

1. Fill in **Nama**.
2. Fill in a valid **Email**.
3. Fill in **Pesan**.
4. Check **Saya setuju pesan ini dikirim melalui email.**.
5. Click **Kirim Pesan**.
6. Confirm that the success message appears.
7. Confirm that the email arrives at `abdalnasution63@gmail.com`.
8. Click **Reply** and confirm that the reply address is the visitor's email.

If the variables are empty or the EmailJS request fails, the website displays an error message and recommends contacting Abdal through WhatsApp.

