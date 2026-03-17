type RSVPBody = {
  name: string;
  phone: string;
  attending: "yes" | "no";
  message?: string;
  pageUrl?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<RSVPBody>;

    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const attending = body.attending;
    const message = (body.message || "").trim();
    const pageUrl = (body.pageUrl || "").trim();

    if (!name || !phone || (attending !== "yes" && attending !== "no")) {
      return Response.json(
        { ok: false, error: "INVALID_PAYLOAD" },
        { status: 400 }
      );
    }

    // Tạm thời: KHÔNG gửi email để web hoạt động trơn tru.
    // (Dữ liệu vẫn được nhận ở đây; bạn có thể bật lại mail sau.)
    console.log("RSVP received:", {
      name,
      phone,
      attending,
      message,
      pageUrl,
      receivedAt: new Date().toISOString(),
    });

    return Response.json({ ok: true, mail: "disabled" });
  } catch {
    return Response.json(
      { ok: false, error: "SEND_FAILED" },
      { status: 500 }
    );
  }
}

