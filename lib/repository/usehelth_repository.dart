import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/usehelth_model.dart';
import 'package:gym/params/usehelth_params.dart';
import 'package:retrofit/retrofit.dart';

part 'usehelth_repository.g.dart';

final usehelthRepositoryProvider =
    Provider<UsehelthRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return UsehelthRepository(dio, baseUrl: 'http://$ip/usehelth');
});

@RestApi()
abstract class UsehelthRepository {
  factory UsehelthRepository(Dio dio, {String baseUrl}) =
      _UsehelthRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<UsehelthModel>> getUsehelthWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UsehelthModel>> getUsehelth({
    @Queries() required UsehelthParams usehelthParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UsehelthModel>> postUsehelth({
    @Body() required UsehelthParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UsehelthModel>> putUsehelth({
    @Body() required UsehelthParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<UsehelthModel>> deleteUsehelth({
    @Body() required UsehelthParams body,
  });
}
