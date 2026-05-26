const axios = require("axios");
const fs = require("fs");

const WEBHOOK_URL = "https://discord.com/api/webhooks/1508798832064987237/BHX88f8oK73YSSvUoXIzv7KADV3g2pFoAVH0A2gD8D0kdDD12dDaDR1EH0er0kiHDQev";
const API_URL = "https://api.shngm.io/v1/manga/list?page=1&page_size=24&genre_include_mode=or&genre_exclude_mode=or&sort=latest&sort_order=desc";

async function checkUpdate() {

  try {

    const response = await axios.get(API_URL);

    const updates = response.data.data;

    // ambil 5 terbaru aja
    const latestUpdates = updates.slice(0, 5);

    let sent = [];

    if (fs.existsSync("sent.json")) {
      sent = JSON.parse(fs.readFileSync("sent.json"));
    }

    for (const item of latestUpdates.reverse()) {

      const title = item.title;

      const chapter = item.latest_chapter_number;

      const thumbnail = item.cover_image_url;

      const id = `${title}-${chapter}`;

      // skip kalau udah pernah
      if (sent.includes(id)) continue;

      await axios.post(WEBHOOK_URL, {
        embeds: [
          {
            title: title,
            description: `📖 Chapter ${chapter} baru upload`,
            color: 16711680,

            thumbnail: {
              url: thumbnail
            },

            footer: {
              text: "Shinigami Update"
            },

            timestamp: new Date()
          }
        ]
      });

      console.log(`Terkirim: ${title} Chapter ${chapter}`);

      sent.push(id);

    }

    // simpan max 50 history
    sent = sent.slice(-50);

    fs.writeFileSync("sent.json", JSON.stringify(sent));

  } catch (err) {

    console.log("Error:", err.message);

  }

}

// cek tiap 1 menit
setInterval(checkUpdate, 60000);

checkUpdate();