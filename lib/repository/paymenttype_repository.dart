import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/paymenttype_model.dart';
import 'package:gym/params/paymenttype_params.dart';
import 'package:retrofit/retrofit.dart';

part 'paymenttype_repository.g.dart';

final paymenttypeRepositoryProvider =
    Provider<PaymenttypeRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return PaymenttypeRepository(dio, baseUrl: 'http://$ip/paymenttype');
});

@RestApi()
abstract class PaymenttypeRepository {
  factory PaymenttypeRepository(Dio dio, {String baseUrl}) =
      _PaymenttypeRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<PaymenttypeModel>> getPaymenttypeWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymenttypeModel>> getPaymenttype({
    @Queries() required PaymenttypeParams paymenttypeParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymenttypeModel>> postPaymenttype({
    @Body() required PaymenttypeParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymenttypeModel>> putPaymenttype({
    @Body() required PaymenttypeParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<PaymenttypeModel>> deletePaymenttype({
    @Body() required PaymenttypeParams body,
  });
}
