import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/login_response.dart';
import 'package:gym/common/utils/data_utils.dart';
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final AuthRepositoryProvider = Provider<AuthRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return AuthRepository(baseUrl: 'http://$ip/api', dio: dio);
});

class AuthRepository {
  final String baseUrl;
  final Dio dio;

  AuthRepository({
    required this.baseUrl,
    required this.dio,
  });
  Future<LoginResponse> login({
    required String loginid,
    required String passwd,
  }) async {
    final data = {
      'loginid': loginid,
      'passwd': passwd,
    };

    final res = await dio.get(
      '$baseUrl/jwt',
      queryParameters: data,
    );

    return LoginResponse.fromJson(res.data);
  }

  // Future<TokenResponse> tokem() async {
  //   final res = await dio.post(
  //     '$baseUrl/token',
  //     options: Options(
  //       headers: {
  //         'refreshToken': 'true',
  //       },
  //     ),
  //   );
  //   return TokenResponse.fromJson(res.data);
  // }
}
