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
              <q-item-label lines="1">{{ "Desconhecido" }}</q-item-label>
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
              >
                {{ chat.number_of_unread_messages }}
              </q-chip>
            </q-item-section>
          </q-item>
          <!-- <q-separator inset="item" /> -->
        </q-list>
      </q-card>
    </q-card-section>
    <q-card-section class="col-12 col-sm-12 col-md-8 full-height">
      <q-card class="chat-section row" v-if="currentChat?.id">
        <q-card-section class="col-12 row items-center">
          <div class="col-1 text-start">
            <q-avatar size="55px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>
          </div>
          <div class="col-11 row q-pl-md">
            <div class="col-12">João Carlos</div>
            <div class="col-12 text-caption text-grey">Online</div>
          </div>
          <div class="col-12">
            <q-separator></q-separator>
          </div>
        </q-card-section>
        <q-card-section class="col-12 q-pa-none">
          <div class="q-pa-md row justify-center">
            <div style="width: 100%">
              <q-chat-message
                name="me"
                :text="['hey, how are you?', 'aaa']"
                sent
              />
              <q-chat-message name="Jane" :text="['doing fine, how r you?']" />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="col-12">
          <q-input
            v-model="chatMessage"
            outlined
            placeholder="Escreve uma mensagem"
          >
            <template v-slot:after>
              <q-icon name="send" />
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
import { ref, onMounted } from "vue";

const chatMessage = ref(null);
const chats = ref([]);
const currentChat = ref(null);
const loadingCurrentChat = ref(false);
const chatPagination = ref({
  page: 1,
  per_page: 5,
  total: 0,
});

const calculateElapsedTime = (initialDate) => {
  if (!initialDate) return "";

  const finalDate = new Date();
  const diffInMilisseconds = finalDate - initialDate;
  const secondsElapsed = Math.floor(diffInMilisseconds / 1000);

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
    const { data, pending, execute } = await useApi("/chat_with_chat_user_id", {
      params: {
        chat_user_id: chat_user.id,
      },
    });

    execute();

    if (data.value) {
      currentChat.value = data.value;
    }

    if (pending) {
      loadingCurrentChat.value = false;
    }
  } catch (error) {
    console.error(error);
  }
};

const getChats = async () => {
  try {
    const { data, pending, execute } = await useApi("/chats", {
      params: {
        ...chatPagination,
      },
    });

    await execute();

    if (data.value) {
      const { page, per_page, total } = data.value.pagination_params ?? {};
      chats.value = data.value.chats;

      console.log("a: ", data.value.chats)
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

onMounted(() => {
  getChats();
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
</style>
