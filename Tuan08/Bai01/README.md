# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Hướng dẫn bổ sung (Tiếng Việt)

Ứng dụng này sử dụng Expo Router và SQLite để lưu tasks cục bộ, và có chức năng đồng bộ mô phỏng với cloud (API giả lập).

- Chạy dự án:

```pwsh
npm install
npx expo start
```

- Build preview và phân phối trên expo.dev (Build Preview):
   1. Đăng nhập vào tài khoản Expo: `npx expo login`
 2. Tạo build preview bằng: `eas build --profile preview --platform all` (nếu dùng EAS). Nếu chỉ muốn phân phối qua expo.dev, bạn có thể dùng `expo publish` hoặc `eas submit` tùy kịch bản.
 3. Mở trang build trên https://expo.dev/accounts để chia sẻ link build preview.

- Chức năng đồng bộ (sync):
   - Ứng dụng có module `utils/sync.js` thực hiện 2 bước: push các task cục bộ có flag dirty lên cloud (mô phỏng), sau đó fetch các task từ cloud và merge vào SQLite local.
   - Demo cloud là giả lập trong `utils/api.js` (mảng in-memory). Ở production, thay bằng endpoint thực tế (REST API) và xử lý map id/resolve conflict kỹ hơn.

Nếu muốn tôi thay `utils/api.js` bằng các gọi REST thật tới một endpoint (ví dụ `https://your.api/tasks`), gửi URL và chi tiết API và tôi sẽ cập nhật.
