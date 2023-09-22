import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:gym/user/model/user_me_model.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/user/model/user_model.dart';
import 'package:gym/user/model/user_params.dart';
import 'package:retrofit/retrofit.dart';

part 'user_me_repository.g.dart';

final userMeRepositoryProvider = Provider<UserMeRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return UserMeRepository(dio, baseUrl: 'http://$ip/user');
});

@RestApi()
abstract class UserMeRepository {
  factory UserMeRepository(Dio dio, {String baseUrl}) = _UserMeRepository;

  @GET('/me')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<UserModel>> getMe();

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UserModel>> getUser({
    @Queries() UserParams? userParams = const UserParams(),
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UserModel>> postUser({
    @Body() UserParams? userParams = const UserParams(),
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UserModel>> putUser({
    @Body() UserParams? userParams = const UserParams(),
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UserModel>> DeleteUser({
    @Body() UserParams? userParams = const UserParams(),
  });
}
