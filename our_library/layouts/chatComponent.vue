<template>
  <q-card
    class="shadow-0 row card"
    style="background-color: rgba(255, 255, 255, 0.6)"
  >
    <q-card-section class="col-12 col-sm-12 col-md-4 q-pr-none">
      <q-card class="chat-section">
        <q-list bordered class="rounded-borders q-pr-sm">
          <q-item-label header>Suas conversas</q-item-label>
          <q-item
            v-for="chat in chats"
            :key="chat.id"
            clickable
            v-ripple
            @click="setCurrentChat(chat)"
          >
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{
                chat?.users?.filter((user) => user.id != currentUserId)[0]
                  ?.name || "Desconhecido"
              }}</q-item-label>
              <q-item-label caption lines="2">
                <span class="text-weight-bold">
                  {{ chat.last_message || "" }}
                </span>
              </q-item-label>
            </q-item-section>

            <q-item-section side top class="row items-center justify-center">
              {{ calculateElapsedTime(chat.last_message_sent_date) }}
              <q-chip
                style="background-color: #ffcc00"
                text-color="white"
                class="text-caption q-mr-md"
                v-if="chat?.number_of_unread_messages > 0"
              >
                {{ chat.number_of_unread_messages }}
              </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-card-section>
    <q-card-section class="col-12 col-sm-12 col-md-8 full-height">
      <q-card class="chat-section row" v-if="currentChat?.id">
        <q-card-section class="col-12 row items-center">
          <div class="col-2 col-sm-1 col-md-2 col-lg-1 text-start">
            <q-avatar size="55px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>
          </div>
          <div class="col-10 col-sm-10 col-lg-10 row q-pl-md">
            <div class="col-12">
              {{
                currentChat?.users?.filter(
                  (user) => user.id != currentUserId
                )[0]?.name || "Desconhecido"
              }}
            </div>
            <div class="col-12 text-caption text-grey">
              {{ currentChat?.another_user_online ? "Online" : "Offline" }}
            </div>
          </div>
          <div class="col-12 q-mt-sm">
            <q-separator></q-separator>
          </div>
        </q-card-section>
        <q-card-section class="col-12 q-pa-none">
          <div class="q-pa-md row justify-center">
            <div class="chat-box">
              <q-chat-message
                v-for="message in currentChat?.messages || []"
                :key="message.id"
                :name="
                  message.current_user
                    ? 'Eu'
                    : currentChat?.users?.filter(
                        (user) => user.id != currentUserId
                      )[0]?.name
                "
                :text="[message.body]"
                :sent="message.current_user"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="col-12">
          <q-input
            v-model="chatMessage"
            outlined
            placeholder="Escreva uma mensagem"
            @keypress.enter="sendMessage(currentChat.id, chatMessage)"
          >
            <template v-slot:after>
              <q-icon
                name="send"
                @click="sendMessage(currentChat.id, chatMessage)"
              />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
      <q-card
        v-else-if="loadingCurrentChat"
        class="chat-section row items-center justify-center"
      >
        <q-spinner-hourglass style="color: #ffcc00" size="4em" />
      </q-card>
      <q-card v-else class="chat-section row items-center justify-center">
        <span class="text-center">
          Por enquanto está vazio.
          <br />
          Selecione uma conversa para começar.
        </span>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { authentication } from "../store/modules/authentication";

const config = useRuntimeConfig();
const chatMessage = ref(null);
const chats = ref([]);
const currentChat = ref(null);
const loadingCurrentChat = ref(false);
const chatPagination = ref({
  page: 1,
  per_page: 5,
  total: 0,
});
const { _auth } = authentication();
const currentUserId = _auth.id;
const chatMessagesPagination = ref({
  page: 1,
  per_page: 10,
  total: 0,
});

// Websocket settings
const websocketURL = `${process.env.NODE_ENV == 'production' ? 'wss' : 'ws'}://${config.public.baseWsUrl}/websocket`;
const socket       = new WebSocket(websocketURL);

socket.addEventListener("open", (event) => {
  console.log("WebSocket connected:", event);
});

socket.addEventListener("close", (event) => {
  console.log("WebSocket disconnected:", event);
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  if (data?.message?.type?.includes("message")) {
    const { body, user_id } = data?.message || {};

    if (currentChat?.value?.messages) {
      currentChat.value.messages.push({
        body: body,
        current_user: user_id == currentUserId
      });
    }
  }

  if (data?.message?.type?.includes("status_user")) {
    const { status } = data?.message || {};

    currentChat.value.online = status || false;
  }
});

const calculateElapsedTime = (initialDate) => {
  if (!initialDate || initialDate == null) return "";

  initialDate = new Date(initialDate);

  const finalDate = new Date();
  const diffInMilliseconds = finalDate - initialDate;
  const secondsElapsed = Math.floor(diffInMilliseconds / 1000);

  if (secondsElapsed < 60) {
    return `${secondsElapsed} seg atrás`;
  } else if (secondsElapsed < 3600) {
    const minutesElapsed = Math.floor(secondsElapsed / 60);
    return `${minutesElapsed} min atrás`;
  } else if (secondsElapsed < 86400) {
    const hoursElapsed = Math.floor(secondsElapsed / 3600);
    return `${hoursElapsed} h atrás`;
  } else if (secondsElapsed < 604800) {
    const daysElapsed = Math.floor(secondsElapsed / 86400);
    return `${daysElapsed} d atrás`;
  } else {
    const formattedDate = initialDate.toLocaleDateString();
    return `em ${formattedDate}`;
  }
};

const setCurrentChat = async (chat_user) => {
  try {
    loadingCurrentChat.value = true;

    const { data, execute } = await useApi("/chat_with_chat_user_id", {
      params: {
        chat_user_id: chat_user.id,
      },
    });

    execute();

    if (data.value) {
      currentChat.value = data.value;
      const currentChatId = currentChat.value.id;

      getMessages(currentChatId);
      saveMessagePreview(currentChatId);
      onSubscribe(currentChatId);
    }
  } catch (error) {
    console.error(error);
  }
};

const getChats = async () => {
  try {
    const { data, execute } = await useApi("/chats", {
      params: {
        ...chatPagination,
      },
    });

    await execute();

    if (data.value) {
      const { page, per_page, total } = data.value.pagination_params ?? {};
      chats.value = data.value.chats;

      chatPagination.value = {
        page: page,
        per_page: per_page,
        total: Math.ceil(total / per_page),
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async (chat_id) => {
  try {
    const { data, execute } = await useApi(`/chat/${chat_id}/messages`, {
      params: {
        ...chatMessagesPagination.value
      }
    });

    await execute();

    if (data.value) {
      const { page, per_page, total } = data.value.pagination_params ?? {};

      currentChat.value.messages = data.value.messages;
      chatMessagesPagination.value = {
        page: page,
        per_page: per_page,
        total: Math.ceil(total / per_page),
      };

      loadingCurrentChat.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const saveMessagePreview = async (chat_id) => {
  try {
    await useApi("/save_message_preview", {
      params: {
        chat_id: chat_id,
      },
    });

    const chat = chats.value.find((chat) => chat.id == chat_id);

    if (chat) chat.number_of_unread_messages = 0;
  } catch (error) {
    console.error(error);
  }
};

const onSubscribe = (chat_id) => {
  const subscriptionMessage = {
    command: "subscribe",
    identifier: JSON.stringify({ channel: "ChatChannel", chat_id: chat_id }),
  };

  socket.send(JSON.stringify(subscriptionMessage));
};

const onUnSubscribe = (chat_id) => {
  const subscriptionMessage = {
    command: "unsubscribe",
    identifier: JSON.stringify({ channel: "ChatChannel", chat_id: chat_id }),
  };

  socket.send(JSON.stringify(subscriptionMessage));
};

const onClose = () => socket.close();

const sendMessage = (chat_id, message) => {
  const messageData = {
    command: "message",
    identifier: JSON.stringify({ channel: "ChatChannel", chat_id: chat_id }),
    data: JSON.stringify({
      body_message: message,
      user_id: _auth.id,
      another_user_online: true,
    }),
  };

  socket.send(JSON.stringify(messageData));

  setLastMessageChat(chat_id, message);
  clearInputMessage();
};

const setLastMessageChat = (chat_id, message) => {
  const chat = chats?.value?.find((res) => res.id == chat_id);

  if (chat && message) {
    chat.last_message = message;
    chat.last_message_sent_date = null;
  }
}

const clearInputMessage = () => chatMessage.value = ""

onMounted(() => {
  getChats();
});

onBeforeUnmount(() => {
  onUnSubscribe();
  onClose();
});
</script>

<style scoped>
.card {
  height: 450px;
}

.chat-section {
  height: 425px;
  min-width: 100%;
}

.chat-box {
  width: 100%;
  max-height: 210px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
}

.chat-box::-webkit-scrollbar-thumb:hover {
  /* Estilo do polegar quando o mouse está sobre ele */
  background-color: #2c3e50;
}
</style>
