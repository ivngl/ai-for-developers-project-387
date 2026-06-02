import "@typespec/http";
import "@typespec/rest";

using TypeSpec.Http;
using TypeSpec.Rest;

@server("http://localhost:3001", "Simple Cal API")
@service({
  title: "Simple Cal",
  version: "1.0.0",
})
namespace SimpleCalApi;

model EventType {
  id: int32;
  title: string;
  description: string | null;
  duration: int32;
  date: string | null;
  startTime: string | null;
  createdAt: utcDateTime;
  updatedAt: utcDateTime;
}

model CreateEventTypeRequest {
  title: string;
  description?: string;
  @minValue(1)
  duration: int32;
  date?: string;
  startTime?: string;
}

model UpdateEventTypeRequest {
  title?: string;
  description?: string | null;
  @minValue(1)
  duration?: int32;
  date?: string | null;
  startTime?: string | null;
}

model Booking {
  id: int32;
  eventTypeId: int32;
  guestName: string | null;
  guestEmail: string | null;
  startTime: utcDateTime;
  endTime: utcDateTime;
  createdAt: utcDateTime;
  updatedAt: utcDateTime;
}

model CreateBookingRequest {
  eventTypeId: int32;
  guestName?: string;
  guestEmail?: string;
  startTime: utcDateTime;
  endTime: utcDateTime;
}

model Slot {
  startTime: utcDateTime;
  endTime: utcDateTime;
  available: boolean;
}

model AdminLoginRequest {
  password: string;
}

model AdminLoginResponse {
  token: string;
}

model ErrorResponse {
  error: string;
}

@route("/api/admin")
namespace AdminAuth {
  @doc("""
    Authenticates as the calendar owner.
    The password is validated against the ADMIN_PASSWORD environment variable.
    Returns a JWT token valid for 24 hours.
  """)
  @post
  @route("/login")
  op login(@body body: AdminLoginRequest): AdminLoginResponse | ErrorResponse;
}

@route("/api/event-types")
namespace EventTypes {
  @doc("Returns all event types. Public — no auth required.")
  @get
  op list(): EventType[] | ErrorResponse;

  @doc("Creates a new event type. Admin only.")
  @post
  op create(@header Authorization: string, @body body: CreateEventTypeRequest): EventType | ErrorResponse;

  @doc("Updates an existing event type. Admin only.")
  @put
  op update(@path id: int32, @header Authorization: string, @body body: UpdateEventTypeRequest): EventType | ErrorResponse;

  @doc("Deletes an event type and its bookings. Admin only.")
  @delete
  op delete(@path id: int32, @header Authorization: string): { status: "ok" } | ErrorResponse;
}

@route("/api/slots")
namespace Slots {
  @doc("""
    Returns available time slots for a given event type on a specific date.
    - Only dates within the next 14 days (from today) are accepted.
    - If the event type has date + startTime set (single-slot type), only slots on
      that exact date are returned; the only slot starts at startTime and has the
      event type's duration.
    - If the event type has no date/startTime (template type), slots are generated
      across business hours.
    - Business hours: configured via WORK_HOURS_START/END env vars (default 09:00–18:00).
  """)
  @get
  op getAvailableSlots(@query eventTypeId: int32, @query date: string): Slot[] | ErrorResponse;
}

@route("/api/bookings")
namespace Bookings {
  @doc("""
    Creates a new booking (guest-facing, no auth required).
    Returns 409 Conflict if the time slot overlaps with any existing booking
    (regardless of event type — double-booking is never allowed).
  """)
  @post
  op create(@body body: CreateBookingRequest): Booking | ErrorResponse;

  @doc("Returns all bookings across all event types. Admin only.")
  @get
  op list(@header Authorization: string): Booking[] | ErrorResponse;
}
