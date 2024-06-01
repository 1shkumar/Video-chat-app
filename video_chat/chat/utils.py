import time
from agora_token_builder import RtcTokenBuilder, RtcRole

def generate_agora_token(channel_name, uid, role):
    app_id = 'ca3dd76709dc48119e08ea1c39c109af'
    app_certificate = 'bca87ebdf570403da5cbc8a45091e8b9'
    expiration_time_in_seconds = 3600
    current_timestamp = int(time.time())
    privilege_expired_ts = current_timestamp + expiration_time_in_seconds

    token = RtcTokenBuilder.buildTokenWithUid(
        app_id, app_certificate, channel_name, uid, role, privilege_expired_ts)
    return token
