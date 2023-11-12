import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/stop_model.dart';
import 'package:gym/params/stop_params.dart';
import 'package:retrofit/retrofit.dart';

part 'stop_repository.g.dart';

final stopRepositoryProvider =
    Provider<StopRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return StopRepository(dio, baseUrl: 'http://$ip/stop');
});

@RestApi()
abstract class StopRepository {
  factory StopRepository(Dio dio, {String baseUrl}) =
      _StopRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<StopModel>> getStopWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<StopModel>> getStop({
    @Queries() required StopParams stopParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<StopModel>> postStop({
    @Body() required StopParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<StopModel>> putStop({
    @Body() required StopParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<StopModel>> deleteStop({
    @Body() required StopParams body,
  });
}
