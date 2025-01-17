const message = document.getElementById("message");
const output = document.getElementById("output");
const getLocationButton = document.getElementById("getLocation");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        output.innerHTML = `
          <p>現在地情報:</p>
          <p>緯度: ${latitude}</p>
          <p>経度: ${longitude}</p>
        `;
        message.textContent = "位置情報を正常に取得しました。";
      },
      (error) => {
        showError(error);
      }
    );
  } else {
    message.textContent = "お使いのブラウザは位置情報取得をサポートしていません。";
  }
}

function showError(error) {
  let errorMessage = "位置情報の取得に失敗しました。";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMessage = "位置情報取得が拒否されました。";
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessage = "位置情報が利用できません。";
      break;
    case error.TIMEOUT:
      errorMessage = "位置情報取得がタイムアウトしました。";
      break;
    default:
      errorMessage = "不明なエラーが発生しました。";
  }
  output.innerHTML = `
    <p class="error">${errorMessage}</p>
    <button onclick="getLocation()">再試行</button>
  `;
}

getLocationButton.addEventListener("click", getLocation);