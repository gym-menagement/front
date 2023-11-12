import 'package:gym/common/const/data.dart';
import 'package:gym/common/secure_storage/secure_storage.dart';
import 'package:gym/user/model/user_model.dart';
import 'package:gym/user/repository/auth_repository.dart';
import 'package:gym/user/repository/user_me_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final userMeProvider =
    StateNotifierProvider<UserMeStateNotifier, UserModelBase?>(
  (ref) {
    final authRepository = ref.watch(AuthRepositoryProvider);
    final userMeRepository = ref.watch(userMeRepositoryProvider);
    final storage = ref.watch(secureStorageProvider);

    return UserMeStateNotifier(
      authRepository: authRepository,
      repository: userMeRepository,
      storage: storage,
    );
  },
);

class UserMeStateNotifier extends StateNotifier<UserModelBase?> {
  final AuthRepository authRepository;
  final UserMeRepository repository;
  final FlutterSecureStorage storage;

  UserMeStateNotifier({
    required this.authRepository,
    required this.repository,
    required this.storage,
  }) : super(UserModelLoading()) {
    getMe();
  }

  Future<void> getMe() async {
    final accessToken = await storage.read(key: ACCESS_TOKEN_KEY);

    if (accessToken == null) {
      state = null;
      return;
    }

    final res = await repository.getMe();

    state = res.item;
  }

  Future<UserModelBase> login({
    required String loginid,
    required String passwd,
  }) async {
    try {
      state = UserModelLoading();

      final res = await authRepository.login(
        loginid: loginid,
        passwd: passwd,
      );

      await storage.write(key: ACCESS_TOKEN_KEY, value: res.accessToken);

      final userRes = await repository.getMe();

      state = userRes.item;

      return userRes.item;
    } catch (e) {
      print(e);
      state = UserModelError(message: '로그인에 실패했습니다.');

      return Future.value(state);
    }
  }

  Future<void> logout() async {
    state = null;

    await Future.wait(
      [
        storage.delete(key: ACCESS_TOKEN_KEY),
      ],
    );
  }
}
