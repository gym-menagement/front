import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/payment_model.dart';
import 'package:gym/params/payment_params.dart';
import 'package:retrofit/retrofit.dart';

part 'payment_repository.g.dart';

final paymentRepositoryProvider =
    Provider<PaymentRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return PaymentRepository(dio, baseUrl: 'http://$ip/payment');
});

@RestApi()
abstract class PaymentRepository {
  factory PaymentRepository(Dio dio, {String baseUrl}) =
      _PaymentRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<PaymentModel>> getPaymentWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymentModel>> getPayment({
    @Queries() required PaymentParams paymentParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymentModel>> postPayment({
    @Body() required PaymentParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymentModel>> putPayment({
    @Body() required PaymentParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymentModel>> deletePayment({
    @Body() required PaymentParams body,
  });
}
