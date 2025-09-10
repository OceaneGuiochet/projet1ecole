<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router"
import { auth } from "@/firebase"
import {  signInWithEmailAndPassword } from "firebase/auth";

const form = reactive({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");
const success = ref(false);

const router = useRouter()

function login() {
  loading.value = true;
  error.value = "";
  success.value = false;


  signInWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential) => {
      console.log("Utilisateur connecté :", userCredential.user);
      success.value = true;
      router.push({path: '/'})
    })
    .catch((e) => {
      console.error("Erreur de connexion :", e);
      error.value = "Identifiants invalides";
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <div class="max-w-md mx-auto p-8 bg-gray-50 rounded-2xl shadow-md">
    <h1 class="text-3xl font-bold text-emerald-800 mb-6 text-center">
      Connexion
    </h1>

    <form @submit.prevent="login" class="space-y-4">
      <input
        v-model="form.email"
        type="email"
        placeholder="Votre email"
        required
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      />

      <input
        v-model="form.password"
        type="password"
        placeholder="Votre mot de passe"
        required
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      />

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400 transition"
      >
        {{ loading ? "Connexion en cours..." : "Se connecter" }}
      </button>
    </form>

    <p
      v-if="success"
      class="mt-4 text-center text-emerald-700 font-semibold"
    >
       Connexion réussie !
    </p>
    <p
      v-if="error"
      class="mt-4 text-center text-red-600 font-semibold"
    >
      {{ error }}
    </p>
  </div>
</template>

