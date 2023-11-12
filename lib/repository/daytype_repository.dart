import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/daytype_model.dart';
import 'package:gym/params/daytype_params.dart';
import 'package:retrofit/retrofit.dart';

part 'daytype_repository.g.dart';

final daytypeRepositoryProvider =
    Provider<DaytypeRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return DaytypeRepository(dio, baseUrl: 'http://$ip/daytype');
});

@RestApi()
abstract class DaytypeRepository {
  factory DaytypeRepository(Dio dio, {String baseUrl}) =
      _DaytypeRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<DaytypeModel>> getDaytypeWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<DaytypeModel>> getDaytype({
    @Queries() required DaytypeParams daytypeParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<DaytypeModel>> postDaytype({
    @Body() required DaytypeParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<DaytypeModel>> putDaytype({
    @Body() required DaytypeParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<DaytypeModel>> deleteDaytype({
    @Body() required DaytypeParams body,
  });
}
