import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/rockergroup_model.dart';
import 'package:gym/params/rockergroup_params.dart';
import 'package:gym/repository/rockergroup_repository.dart';

final rockergroupProvider =
    StateNotifierProvider<RockergroupProvider, List<RockergroupModel>>((ref) {
  final repository = ref.watch(rockergroupRepositoryProvider);
  return RockergroupProvider(repository: repository);
});

class RockergroupProvider extends StateNotifier<List<RockergroupModel>> {
  final RockergroupRepository repository;

  RockergroupProvider({
    required this.repository,
  }) : super([]) {
    getRockergroup(const RockergroupParams());
  }

  Future<void> getRockergroup(RockergroupParams rockergroup) async {
    final res = await repository.getRockergroup(rockergroupParams: rockergroup);
    state = res.items;
  }
}
