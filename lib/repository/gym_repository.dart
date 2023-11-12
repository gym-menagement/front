import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/gym_model.dart';
import 'package:gym/params/gym_params.dart';
import 'package:retrofit/retrofit.dart';

part 'gym_repository.g.dart';

final gymRepositoryProvider =
    Provider<GymRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return GymRepository(dio, baseUrl: 'http://$ip/gym');
});

@RestApi()
abstract class GymRepository {
  factory GymRepository(Dio dio, {String baseUrl}) =
      _GymRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<GymModel>> getGymWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<GymModel>> getGym({
    @Queries() required GymParams gymParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<GymModel>> postGym({
    @Body() required GymParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<GymModel>> putGym({
    @Body() required GymParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<GymModel>> deleteGym({
    @Body() required GymParams body,
  });
}
