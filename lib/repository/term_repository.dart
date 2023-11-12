import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/term_model.dart';
import 'package:gym/params/term_params.dart';
import 'package:retrofit/retrofit.dart';

part 'term_repository.g.dart';

final termRepositoryProvider =
    Provider<TermRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return TermRepository(dio, baseUrl: 'http://$ip/term');
});

@RestApi()
abstract class TermRepository {
  factory TermRepository(Dio dio, {String baseUrl}) =
      _TermRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<TermModel>> getTermWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<TermModel>> getTerm({
    @Queries() required TermParams termParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<TermModel>> postTerm({
    @Body() required TermParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<TermModel>> putTerm({
    @Body() required TermParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<TermModel>> deleteTerm({
    @Body() required TermParams body,
  });
}
