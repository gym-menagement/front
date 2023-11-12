import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/paymentform_model.dart';
import 'package:gym/params/paymentform_params.dart';
import 'package:retrofit/retrofit.dart';

part 'paymentform_repository.g.dart';

final paymentformRepositoryProvider =
    Provider<PaymentformRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return PaymentformRepository(dio, baseUrl: 'http://$ip/paymentform');
});

@RestApi()
abstract class PaymentformRepository {
  factory PaymentformRepository(Dio dio, {String baseUrl}) =
      _PaymentformRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<PaymentformModel>> getPaymentformWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymentformModel>> getPaymentform({
    @Queries() required PaymentformParams paymentformParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymentformModel>> postPaymentform({
    @Body() required PaymentformParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymentformModel>> putPaymentform({
    @Body() required PaymentformParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymentformModel>> deletePaymentform({
    @Body() required PaymentformParams body,
  });
}
