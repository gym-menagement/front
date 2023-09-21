import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:gym/employee/model/role_model.dart';
import 'package:gym/employee/model/role_params.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:retrofit/retrofit.dart';

part 'role_repository.g.dart';

final roleRepositoryProvider = Provider<RoleRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return RoleRepository(dio, baseUrl: 'http://$ip/role');
});

@RestApi()
abstract class RoleRepository<T> {
  factory RoleRepository(Dio dio, {String baseUrl}) = _RoleRepository;

  @override
  @GET('/')
  @Headers({'accessToken': 'true'})
  Future<ModelWithItems<RoleModel>> getRole({
    @Queries() RoleParams? roleParams = const RoleParams(),
  });
}
