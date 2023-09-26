<template>
  <q-header elevated class="bg-grey-1 q-mb-none">
    <div class="row justify-between q-px-md q-pt-md items-center">
      <div class="col q-pb-sm">
        <span class="toolbar-logo-title text-red-10">OUR LIBRARY</span>
      </div>
      <div class="col">
        <q-tabs no-caps class="text-black">
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/" label="Meus Livros" />
          <q-route-tab to="/" label="Favoritos" />
        </q-tabs>
      </div>
      <div class="col row justify-end q-pb-sm">
        <q-avatar class="toolbar-actions" size="38px">
          <img
            src="https://robohash.org/3b428839bab087e7469213e7887e9e2d?set=set4&bgset=&size=200x200"
          />
        </q-avatar>
        <q-btn class="toolbar-actions text-red-10" flat label="Perfil" />
        <q-btn class="toolbar-actions text-red-10" outline label="Sair" />
      </div>
    </div>
  </q-header>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Petrona:wght@500&family=Poppins:ital,wght@0,400;0,500;1,700&family=Roboto+Mono:wght@700&family=Roboto:wght@400;500;700&display=swap");

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
  color: #2f3a3b;
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
