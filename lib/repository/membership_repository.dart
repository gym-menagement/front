import 'package:gym/common/const/data.dart';
import 'package:gym/common/dio/dio.dart';
import 'package:gym/common/model/model_item.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/membership_model.dart';
import 'package:gym/params/membership_params.dart';
import 'package:retrofit/retrofit.dart';

part 'membership_repository.g.dart';

final membershipRepositoryProvider =
    Provider<MembershipRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return MembershipRepository(dio, baseUrl: 'http://$ip/membership');
});

@RestApi()
abstract class MembershipRepository {
  factory MembershipRepository(Dio dio, {String baseUrl}) =
      _MembershipRepository;

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItem<MembershipModel>> getMembershipWithId({
    @Path() required int id,
  });

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<MembershipModel>> getMembership({
    @Queries() required MembershipParams membershipParams,
  });

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<MembershipModel>> postMembership({
    @Body() required MembershipParams body,
  });

  @PUT('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<MembershipModel>> putMembership({
    @Body() required MembershipParams body,
  });

  @DELETE('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<ModelWithItems<MembershipModel>> deleteMembership({
    @Body() required MembershipParams body,
  });
}
