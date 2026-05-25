import type { APIRoute } from "astro";
import { z } from "astro/zod";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100).trim(),
  email: z.string().email("Email inválido").max(200).trim().toLowerCase(),
  phone: z.string().regex(/^[+0-9\s-]{9,20}$/, "Teléfono inválido").trim(),
  type: z.enum(["residencia", "nacionalidad", "arraigo", "reagrupacion", "trabajo"], {
    errorMap: () => ({ message: "Selecciona un tipo de trámite válido" }),
  }),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(5000).trim(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const whatsappMessage = [
      `*Nuevo contacto - SomosMigrantes ComoTu*`,
      ``,
      `*Nombre:* ${data.name}`,
      `*Email:* ${data.email}`,
      `*Teléfono:* ${data.phone}`,
      `*Trámite:* ${data.type}`,
      `*Mensaje:* ${data.message}`,
    ].join("\n");

    // Google Sheets integration (v2 - CRM)
    // await fetch(import.meta.env.GOOGLE_SHEETS_WEBHOOK_URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    return new Response(
      JSON.stringify({
        success: true,
        whatsappUrl: `https://wa.me/34600000000?text=${encodeURIComponent(whatsappMessage)}`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ success: false, errors: err.errors.map((e) => e.message) }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    console.error("Contact API error:", err);
    return new Response(
      JSON.stringify({ success: false, errors: ["Error interno del servidor"] }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
