class User {
    constructor() {
        this.id            = 0;
        this.is_bot        = false;
        this.first_name    = '';
        this.last_name     = '';
        this.username      = '';
        this.language_code = '';
    }
}

class ChatPermissions {
    constructor() {
        this.can_send_messages = false;
        this.can_send_media_messages = false;
        this.can_send_polls = false;
        this.can_send_other_messages = false;
        this.can_add_web_page_previews = false;
        this.can_change_info = false;
        this.can_invite_users = false;
        this.can_pin_messages = false;
    }
}

const ChatType = 'private' | 'group' | 'supergroup' | 'channel';

class ChatPhoto {
    constructor() {
        this.small_file_id = '';
        this.big_file_id = '';
    }
}

class Chat {
    constructor() {
        this.id = 0;
        this.type = ChatType;
        this.title = '';
        this.username = '';
        this.first_name = '';
        this.last_name = '';
        this.photo = new ChatPhoto;
        this.description = '';
        this.invite_link = '';
        this.pinned_message = Message;
        this.permissions = new ChatPermissions;
        this.can_set_sticker_set = false;
        this.sticker_set_name = '';
        /**
         * @deprecated since version Telegram Bot API 4.4 - July 29, 2019
         */
        this.all_members_are_administrators = false;
    }
}

const MessageEntityType = 'mention' | 'hashtag' | 'bot_command' | 'url' | 'email' | 'bold' | 'italic' | 'code' | 'pre' | 'text_link' | 'text_mention';

class MessageEntity{
    constructor() {
        this.type = MessageEntityType;
        this.offset = 0;
        this.length = 0;
        this.url = '';
        this.user = new User;
    }
}

class FileBase {
    constructor() {
        this.file_id = '';
        this.file_unique_id = '';
        this.file_size = 0;
    }
}

class PhotoSize extends FileBase {
    constructor() {
        super();
        this.width = 0;
        this.height = 0;
    }
}

class Audio extends FileBase {
    constructor() {
        super();
        this.duration = 0;
        this.performer = '';
        this.title = '';
        this.mime_type = '';
        this.thumb = new PhotoSize;
    }
}

class Document extends FileBase {
    constructor() {
        super();
        this.thumb = new PhotoSize;
        this.file_name = '';
        this.mime_type = '';
    }
}

class Animation extends FileBase {
    constructor() {
        super();
        this.width = 0;
        this.height = 0;
        this.duration = 0;
        this.thumb = new PhotoSize;
        this.file_name = '';
        this.mime_type = '';
    }
}

class Game {
    constructor() {
        this.title = '';
        this.description = '';
        this.photo = [new PhotoSize];
        this.text = '';
        this.text_entities = [new MessageEntity];
        this.animation = new Animation;
    }
}

class MaskPosition {
    constructor() {
        this.point = '';
        this.x_shift = 0;
        this.y_shift = 0;
        this.scale = 0;
    }
}

class Sticker {
    constructor() {
        this.file_id = '';
        this.width = 0;
        this.height = 0;
        this.thumb = new PhotoSize;
        this.emoji = '';
        this.set_name = '';
        this.mask_position = new MaskPosition;
        this.file_size = 0;
    }
}

class Video extends FileBase {
    constructor() {
        super();
        this.width = 0;
        this.height = 0;
        this.duration = 0;
        this.thumb = new PhotoSize;
        this.mime_type = '';
    }
}

class Voice extends FileBase {
    constructor() {
        super();
        this.duration = 0;
        this.mime_type = '';
    }
}

class VideoNote extends FileBase {
    constructor() {
        super();
        this.length = 0;
        this.duration = 0;
        this.thumb = new PhotoSize;
    }
}

class Contact {
    constructor() {
        this.phone_number = '';
        this.first_name = '';
        this.last_name = '';
        this.user_id = 0;
        this.vcard = '';
    }
}

class Location {
    constructor() {
        this.longitude = 0;
        this.latitude = 0;
    }
}

class Venue {
    constructor() {
        this.location = new Location;
        this.title = '';
        this.address = '';
        this.foursquare_id = '';
        this.foursquare_type = '';
    }
}

class PollOption {
    constructor() {
        this.text = '';
        this.voter_count = 0;
    }
}

class Poll {
    constructor() {
        this.id = '';
        this.question = '';
        this.options = [new PollOption];
        this.is_closed = false;
    }
}

class Invoice {
    constructor() {
        this.title = '';
        this.description = '';
        this.start_parameter = '';
        this.currency = '';
        this.total_amount = 0;
    }
}

class ShippingAddress {
    constructor() {
        this.country_code = '';
        this.state = '';
        this.city = '';
        this.street_line1 = '';
        this.street_line2 = '';
        this.post_code = '';
    }

}

class OrderInfo {
    constructor() {
        this.name = '';
        this.phone_number = '';
        this.email = '';
        this.shipping_address = new ShippingAddress;
    }
}

class SuccessfulPayment {
    constructor() {
        this.currency = '';
        this.total_amount = 0;
        this.invoice_payload = '';
        this.shipping_option_id = '';
        this.order_info = new OrderInfo;
        this.telegram_payment_charge_id = '';
        this.provider_payment_charge_id = '';
    }
}

class EncryptedCredentials {
    constructor() {
        this.data = '';
        this.hash = '';
        this.secret = '';
    }
}

class PassportFile {
    constructor() {
        this.file_id = '';
        this.file_size = 0;
        this.file_date = 0;
    }
}
class EncryptedPassportElement {
    constructor() {
        this.type = '';
        this.data = '';
        this.phone_number = '';
        this.email = '';
        this.files = [new PassportFile];
        this.front_side = new PassportFile;
        this.reverse_side = new PassportFile;
        this.selfie = new PassportFile;
        this.translation = [new PassportFile];
        this.hash = '';
    }
}

class PassportData {
    constructor() {
        this.data = [new EncryptedPassportElement];
        this.credentials = new EncryptedCredentials;
    }
}

class LoginUrl {
    constructor() {
        this.url = '';
        this.forward_text = '';
        this.bot_username = '';
        this.request_write_acces = false;
    }
}

const CallbackGame = new Object;

class InlineKeyboardButton {
    constructor() {
        this.text = '';
        this.url = '';
        this.login_url = new LoginUrl;
        this.callback_data = '';
        this.switch_inline_query = '';
        this.switch_inline_query_current_chat = '';
        this.callback_game = CallbackGame;
        this.pay = false;
    }
}

class InlineKeyboardMarkup {
    constructor() {
        this.inline_keyboard = [[new InlineKeyboardButton]];
    }
}

class Message {
    constructor() {
        this.message_id = 0;
        this.from = new User;
        this.date = 0;
        this.chat = new Chat;
        this.forward_from = new User;
        this.forward_from_chat = new Chat;
        this.forward_from_message_id = 0;
        this.forward_signature = '';
        this.forward_sender_name = '';
        this.forward_date = 0;
        this.reply_to_message = Message;
        this.edit_date = 0;
        this.media_group_id = '';
        this.author_signature = '';
        this.text = '';
        this.entities = [new MessageEntity];
        this.caption_entities = [new MessageEntity];
        this.audio = new Audio;
        this.document = new Document;
        this.animation = new Animation;
        this.game = new Game;
        this.photo = [new PhotoSize];
        this.sticker = new Sticker;
        this.video = new Video;
        this.voice = new Voice;
        this.video_note = new VideoNote;
        this.caption = '';
        this.contact = new Contact;
        this.location = new Location;
        this.venue = new Venue;
        this.poll = new Poll;
        this.new_chat_members = [new User];
        this.left_chat_member = new User;
        this.new_chat_title = '';
        this.new_chat_photo = [new PhotoSize];
        this.delete_chat_photo = false;
        this.group_chat_created = false;
        this.supergroup_chat_created = false;
        this.channel_chat_created = false;
        this.migrate_to_chat_id = 0;
        this.migrate_from_chat_id = 0;
        this.pinned_message = Message;
        this.invoice = new Invoice;
        this.successful_payment = new SuccessfulPayment;
        this.connected_website = '';
        this.passport_data = new PassportData;
        this.reply_markup = new InlineKeyboardMarkup;
    }
}

module.exports = new Message;