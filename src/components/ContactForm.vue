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
  <div class="max-w-2xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-md">
    <h1 class="text-3xl font-bold text-emerald-800 mb-6 text-center">
      Contactez-nous
    </h1>

    <form @submit.prevent="envoyerMessage" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <input
          v-model="form.firstname"
          type="text"
          placeholder="Votre prénom"
          required
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <input
          v-model="form.lastname"
          type="text"
          placeholder="Votre nom"
          required
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      <input
        v-model="form.email"
        type="email"
        placeholder="Votre email"
        required
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      />

      <textarea
        v-model="form.message"
        rows="5"
        placeholder="Votre message"
        required
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      ></textarea>

      <button
        type="submit"
        :disabled="enCours"
        class="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400 transition"
      >
        {{ enCours ? "Envoi en cours..." : "Envoyer le message" }}
      </button>
    </form>

    <p
      v-if="envoye"
      class="mt-4 text-center text-emerald-700 font-semibold"
    >
      ✅ Message envoyé avec succès !
    </p>
    <p
      v-if="erreur"
      class="mt-4 text-center text-red-600 font-semibold"
    >
       Une erreur est survenue. Veuillez réessayer.
    </p>
  </div>
</template>
