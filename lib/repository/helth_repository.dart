import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/helth_model.dart';
import 'package:gym/params/helth_params.dart';
import 'package:retrofit/retrofit.dart';

part 'helth_repository.g.dart';

final helthRepositoryProvider =
    Provider<HelthRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return HelthRepository(dio, baseUrl: 'http://$ip/helth');
});

@RestApi()
abstract class HelthRepository {
  factory HelthRepository(Dio dio, {String baseUrl}) =
      _HelthRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<HelthModel>> getHelthWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<HelthModel>> getHelth({
    @Queries() required HelthParams helthParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<HelthModel>> postHelth({
    @Body() required HelthParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<HelthModel>> putHelth({
    @Body() required HelthParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<HelthModel>> deleteHelth({
    @Body() required HelthParams body,
  });
}
