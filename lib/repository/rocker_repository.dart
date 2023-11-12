import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/rocker_model.dart';
import 'package:gym/params/rocker_params.dart';
import 'package:retrofit/retrofit.dart';

part 'rocker_repository.g.dart';

final rockerRepositoryProvider =
    Provider<RockerRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return RockerRepository(dio, baseUrl: 'http://$ip/rocker');
});

@RestApi()
abstract class RockerRepository {
  factory RockerRepository(Dio dio, {String baseUrl}) =
      _RockerRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<RockerModel>> getRockerWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RockerModel>> getRocker({
    @Queries() required RockerParams rockerParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RockerModel>> postRocker({
    @Body() required RockerParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RockerModel>> putRocker({
    @Body() required RockerParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<RockerModel>> deleteRocker({
    @Body() required RockerParams body,
  });
}
