import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/membership_model.dart';
import 'package:gym/params/membership_params.dart';
import 'package:gym/repository/membership_repository.dart';

final membershipProvider =
    StateNotifierProvider<MembershipProvider, List<MembershipModel>>((ref) {
  final repository = ref.watch(membershipRepositoryProvider);
  return MembershipProvider(repository: repository);
});

class MembershipProvider extends StateNotifier<List<MembershipModel>> {
  final MembershipRepository repository;

  MembershipProvider({
    required this.repository,
  }) : super([]) {
    getMembership(const MembershipParams());
  }

  Future<void> getMembership(MembershipParams membership) async {
    final res = await repository.getMembership(membershipParams: membership);
    state = res.items;
  }
}
