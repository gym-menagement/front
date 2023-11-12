import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/discount_model.dart';
import 'package:gym/params/discount_params.dart';
import 'package:retrofit/retrofit.dart';

part 'discount_repository.g.dart';

final discountRepositoryProvider =
    Provider<DiscountRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return DiscountRepository(dio, baseUrl: 'http://$ip/discount');
});

@RestApi()
abstract class DiscountRepository {
  factory DiscountRepository(Dio dio, {String baseUrl}) =
      _DiscountRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<DiscountModel>> getDiscountWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<DiscountModel>> getDiscount({
    @Queries() required DiscountParams discountParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<DiscountModel>> postDiscount({
    @Body() required DiscountParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<DiscountModel>> putDiscount({
    @Body() required DiscountParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<DiscountModel>> deleteDiscount({
    @Body() required DiscountParams body,
  });
}
