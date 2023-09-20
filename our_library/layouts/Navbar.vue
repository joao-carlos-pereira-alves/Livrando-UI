<template>
  <div class="q-pa-md">
    <q-header elevated class="bg-grey-1">
      <!-- Responsive menu <q-btn flat round dense icon="menu" class="q-mr-sm text-red-10" /> -->
      <div class="row justify-between toolbar">
        <div class="col-2">
          <span class="toolbar-logo-title text-red-10">OUR LIBRARY</span>
        </div>

        <div class="col-4 toolbar-content-links">
          <NuxtLink to="/home" style="text-decoration: none;">
            <span class="toolbar-link">Home</span>
          </NuxtLink>
          <span class="toolbar-link">Meus Livros</span>
          <span class="toolbar-link">Favoritos</span>
        </div>

        <div class="col-2">
          <q-avatar class="toolbar-actions" size="38px">
            <img src="https://robohash.org/3b428839bab087e7469213e7887e9e2d?set=set4&bgset=&size=200x200">
          </q-avatar>
          <q-btn class="toolbar-actions text-red-10" flat label="Perfil" />
          <q-btn class="toolbar-actions text-red-10" outline label="Sair" />
        </div>
      </div>
    </q-header>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Petrona:wght@500&family=Poppins:ital,wght@0,400;0,500;1,700&family=Roboto+Mono:wght@700&family=Roboto:wght@400;500;700&display=swap');

.toolbar {
  margin: 1em;
}

.toolbar-logo-title {
  text-align: center;
  justify-content: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  font-family: Petrona;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
}

.toolbar-content-links {
  justify-content: center;
  text-align: center;
}

.toolbar-link {
  color: #2F3A3B;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 0.5em;
}

.toolbar-link:hover {
  border-bottom: 2px solid #b71c1c;
}

.toolbar-actions {
  margin-left: 0.8em;
}
</style>