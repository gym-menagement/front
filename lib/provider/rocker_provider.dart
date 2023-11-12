import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/rocker_model.dart';
import 'package:gym/params/rocker_params.dart';
import 'package:gym/repository/rocker_repository.dart';

final rockerProvider =
    StateNotifierProvider<RockerProvider, List<RockerModel>>((ref) {
  final repository = ref.watch(rockerRepositoryProvider);
  return RockerProvider(repository: repository);
});

class RockerProvider extends StateNotifier<List<RockerModel>> {
  final RockerRepository repository;

  RockerProvider({
    required this.repository,
  }) : super([]) {
    getRocker(const RockerParams());
  }

  Future<void> getRocker(RockerParams rocker) async {
    final res = await repository.getRocker(rockerParams: rocker);
    state = res.items;
  }
}
