import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/role_model.dart';
import 'package:gym/params/role_params.dart';
import 'package:retrofit/retrofit.dart';

part 'role_repository.g.dart';

final roleRepositoryProvider =
    Provider<RoleRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return RoleRepository(dio, baseUrl: 'http://$ip/role');
});

@RestApi()
abstract class RoleRepository {
  factory RoleRepository(Dio dio, {String baseUrl}) =
      _RoleRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<RoleModel>> getRoleWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RoleModel>> getRole({
    @Queries() required RoleParams roleParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RoleModel>> postRole({
    @Body() required RoleParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RoleModel>> putRole({
    @Body() required RoleParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RoleModel>> deleteRole({
    @Body() required RoleParams body,
  });
}
