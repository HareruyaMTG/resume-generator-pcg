<template>
  <v-app>
    <konva-stage :config="stageConfig" ref="stage">
      <konva-layer>
        <konva-image :config="{ image: background }" />
        <konva-text :config="playerNameConfig" />
        <konva-text :config="favoriteColorConfig" />
        <konva-text :config="activityAreaConfig" />
        <konva-text :config="mtgHistoryConfig" />
        <konva-image
          v-for="(item, index) in noticeConfig"
          :key="index"
          :config="item"
        />
        <konva-image
          v-for="(item, index) in playingFormatConfig"
          :key="index"
          :config="item"
        />
        <konva-text :config="favoriteCardConfig" />
        <konva-text :config="favoriteDeckConfig" />
        <konva-text :config="freeSpaceConfig" />
      </konva-layer>
    </konva-stage>
    <v-form>
      <v-text-field label="プレイヤーネーム" v-model="formInput.playerName" />
      <v-text-field label="好きな色" v-model="formInput.favoriteColor" />
      <v-text-field label="活動地域" v-model="formInput.activityArea" />
      <v-text-field label="MTG歴" v-model="formInput.mtgHistory" />
      <v-select
        label="要望&お知らせ"
        v-model="formInput.notice"
        :items="noticeOptions"
        multiple
        chips
      />
      <v-select
        label="フォーマット"
        v-model="formInput.playingFormat"
        :items="playingFormatOptions"
        multiple
        chips
      />
      <v-radio-group label="カテゴリ" v-model="formInput.playerCategory">
        <v-radio
          v-for="(item, index) in playerCategoryOptions"
          :key="index"
          :label="item"
          :value="item"
        />
      </v-radio-group>
      <v-textarea label="好きなカード" v-model="formInput.favoriteCard" />
      <v-textarea label="好きなデッキ" v-model="formInput.favoriteDeck" />
      <v-textarea label="フリースペース" v-model="formInput.freeSpace" />
    </v-form>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    formInput: {
      playerName: "",
      favoriteColor: "",
      activityArea: "",
      mtgHistory: "",
      notice: [],
      playingFormat: [],
      playerCategory: "",
      favoriteCard: "",
      favoriteDeck: "",
      freeSpace: "",
    },
    noticeOptions: [
      "対戦したい",
      "大会に参加したい",
      "MTG雑談したい",
      "デッキ相談したい",
      "YouTubeやってます",
      "ブログやってます",
      "アリーナやってます",
      "MOやってます",
      "コレクション自慢したい",
    ],
    playingFormatOptions: [
      "スタンダード",
      "ヒストリック",
      "パイオニア",
      "モダン",
      "レガシー",
      "ヴィンテージ",
      "統率者",
      "その他",
    ],
    playerCategoryOptions: ["初心者", "カジュアル・エンジョイ", "ガチ・競技"],
    stageConfig: {
      width: 800,
      height: 450,
    },
    fontSetting: {
      fontSize: 24,
      fontFamily: "Yusei Magic",
      wrap: "char",
    },
    checkSetting: {
      image: null,
      width: 16,
      height: 16,
    },
    background: null,
  }),
  computed: {
    playerNameConfig() {
      const text = this.formInput.playerName;
      const x = 190;
      const y = 97;
      return { ...this.fontSetting, text, x, y };
    },
    favoriteColorConfig() {
      const text = this.formInput.favoriteColor;
      const x = 190;
      const y = 170;
      return { ...this.fontSetting, text, x, y };
    },
    activityAreaConfig() {
      const text = this.formInput.activityArea;
      const x = 500;
      const y = 97;
      return { ...this.fontSetting, text, x, y };
    },
    mtgHistoryConfig() {
      const text = this.formInput.mtgHistory;
      const x = 500;
      const y = 170;
      return { ...this.fontSetting, text, x, y };
    },
    noticeConfig() {
      const checkArray = [];
      const x = 24;
      this.formInput.notice.forEach((item) => {
        const index = this.noticeOptions.indexOf(item);
        checkArray.push({ ...this.checkSetting, x, y: 250 + 19.4 * index });
      });
      return checkArray;
    },
    playingFormatConfig() {
      const formatArray = [];
      const x = 191;
      this.formInput.playingFormat.forEach((item) => {
        const index = this.playingFormatOptions.indexOf(item);
        formatArray.push({ ...this.checkSetting, x, y: 250 + 19.4 * index });
      });
      return formatArray;
    },
    favoriteCardConfig() {
      const text = this.formInput.favoriteCard;
      const x = 324;
      const y = 350;
      const width = 150;
      const height = 75;
      return { ...this.fontSetting, text, x, y, width, height };
    },
    favoriteDeckConfig() {
      const text = this.formInput.favoriteDeck;
      const x = 500;
      const y = 243;
      const width = 280;
      const height = 50;
      return { ...this.fontSetting, text, x, y, width, height };
    },
    freeSpaceConfig() {
      const text = this.formInput.freeSpace;
      const x = 500;
      const y = 350;
      const width = 280;
      const height = 75;
      return { ...this.fontSetting, text, x, y, width, height };
    },
  },
  methods: {
    updateCanvas() {
      this.$refs.stage.getNode().draw();
    },
  },
  mounted() {
    this.$watch(
      "formInput",
      function () {
        const self = this;
        setTimeout(function () {
          self.updateCanvas();
        }, 200);
      },
      { deep: true }
    );
  },
  created() {
    const background = new window.Image();
    background.src = require("@/assets/twitter_2107_MTGRirekisho.jpg");
    background.onload = () => {
      this.background = background;
    };

    const check = new window.Image();
    check.src = require("@/assets/check.svg");
    check.onload = () => {
      this.checkSetting.image = check;
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap");
</style>
