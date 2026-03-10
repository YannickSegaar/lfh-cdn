// VoiceFlow Code Step: update-page-context
// Triggered by: page_context_update event on Listen node
// Purpose: Silently updates page context variables when user navigates between pages
// Routes back to Listen — no response sent to user

var data = (last_event && last_event.payload) ? last_event.payload : last_event;
if (data) {
  if (data.page_type) page_type = data.page_type;
  if (data.page_topic !== undefined) page_topic = data.page_topic;
  if (data.page_path) page_path = data.page_path;
}
