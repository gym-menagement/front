import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/user_model.dart';
import 'package:gym/params/user_params.dart';
import 'package:retrofit/retrofit.dart';

part 'user_repository.g.dart';

final userRepositoryProvider =
    Provider<UserRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return UserRepository(dio, baseUrl: 'http://$ip/user');
});

@RestApi()
abstract class UserRepository {
  factory UserRepository(Dio dio, {String baseUrl}) =
      _UserRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<UserModel>> getUserWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UserModel>> getUser({
    @Queries() required UserParams userParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UserModel>> postUser({
    @Body() required UserParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UserModel>> putUser({
    @Body() required UserParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UserModel>> deleteUser({
    @Body() required UserParams body,
  });
}
