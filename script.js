const bugForm = document.getElementById('bugForm');
const statusMessage = document.getElementById('statusMessage');

bugForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const reporterName = document
    .getElementById('reporterName')
    .value.trim();

  const bugDescription = document
    .getElementById('bugDescription')
    .value.trim();

  // GANTI DENGAN WEBHOOK DISCORD KAMU
  const webhookURL = 'https://discord.com/api/webhooks/1507407745492455474/9Q0ZQLt5n-Vkfw6-1emZLxKF4CKlZjkkLR5EjglpKZqXpbM4okuOONzlRwaIBYI7rBuz';

  const payload = {
    embeds: [
      {
        title: '📢 Bug Report Baru',
        color: 10494192,
        fields: [
          {
            name: '👤 Nama Pelapor',
            value: reporterName
          },
          {
            name: '🐞 Laporan Bug',
            value: bugDescription
          }
        ],
        footer: {
          text: 'Bug Report System'
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      statusMessage.innerText = '✅ Laporan berhasil dikirim!';
      bugForm.reset();
    } else {
      statusMessage.innerText = '❌ Gagal mengirim laporan!';
    }
  } catch (error) {
    statusMessage.innerText = '⚠️ Terjadi error!';
    console.error(error);
  }
});