import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/rockergroup_model.dart';
import 'package:gym/params/rockergroup_params.dart';
import 'package:retrofit/retrofit.dart';

part 'rockergroup_repository.g.dart';

final rockergroupRepositoryProvider =
    Provider<RockergroupRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return RockergroupRepository(dio, baseUrl: 'http://$ip/rockergroup');
});

@RestApi()
abstract class RockergroupRepository {
  factory RockergroupRepository(Dio dio, {String baseUrl}) =
      _RockergroupRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<RockergroupModel>> getRockergroupWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RockergroupModel>> getRockergroup({
    @Queries() required RockergroupParams rockergroupParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RockergroupModel>> postRockergroup({
    @Body() required RockergroupParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RockergroupModel>> putRockergroup({
    @Body() required RockergroupParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RockergroupModel>> deleteRockergroup({
    @Body() required RockergroupParams body,
  });
}
