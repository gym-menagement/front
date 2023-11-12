import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/helthcategory_model.dart';
import 'package:gym/params/helthcategory_params.dart';
import 'package:retrofit/retrofit.dart';

part 'helthcategory_repository.g.dart';

final helthcategoryRepositoryProvider =
    Provider<HelthcategoryRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return HelthcategoryRepository(dio, baseUrl: 'http://$ip/helthcategory');
});

@RestApi()
abstract class HelthcategoryRepository {
  factory HelthcategoryRepository(Dio dio, {String baseUrl}) =
      _HelthcategoryRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<HelthcategoryModel>> getHelthcategoryWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<HelthcategoryModel>> getHelthcategory({
    @Queries() required HelthcategoryParams helthcategoryParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<HelthcategoryModel>> postHelthcategory({
    @Body() required HelthcategoryParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<HelthcategoryModel>> putHelthcategory({
    @Body() required HelthcategoryParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<HelthcategoryModel>> deleteHelthcategory({
    @Body() required HelthcategoryParams body,
  });
}
