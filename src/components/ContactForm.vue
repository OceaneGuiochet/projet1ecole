<script setup>
import { reactive, ref } from "vue";
import emailjs from "@emailjs/browser";

const form = reactive({
  firstname: "",
  lastname: "",
  email: "",
  message: "",
});

const enCours = ref(false);
const envoye = ref(false);
const erreur = ref(false);

function envoyerMessage() {
  enCours.value = true;
  envoye.value = false;
  erreur.value = false;

  emailjs
    .send(
      process.env.VUE_APP_EMAILJS_SERVICE_ID,
      process.env.VUE_APP_EMAILJS_TEMPLATE_ID,
      {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        message: form.message,
      },
      process.env.VUE_APP_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      envoye.value = true;
      Object.assign(form, {
        firstname: "",
        lastname: "",
        email: "",
        message: "",
      });
    })
    .catch((e) => {
      console.error("Erreur :", e);
      erreur.value = true;
    })
    .finally(() => {
      enCours.value = false;
    });
}
</script>

<template>
  <form @submit.prevent="envoyerMessage">
    <input
      v-model="form.firstname"
      type="text"
      placeholder="Votre prénom"
      required
    />
    <input
      v-model="form.lastname"
      type="text"
      placeholder="Votre nom"
      required
    />
    <input
      v-model="form.email"
      type="email"
      placeholder="Votre email"
      required
    />
    <textarea
      v-model="form.message"
      rows="4"
      placeholder="Votre message"
      required
    ></textarea>

    <button type="submit" :disabled="enCours">
      {{ enCours ? "Envoi en cours..." : "Envoyer le message" }}
    </button>

    <p v-if="envoye">Message envoyé</p>
    <p v-if="erreur">Une erreur est survenue</p>
  </form>
</template>
