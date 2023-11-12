import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/stop_model.dart';
import 'package:gym/params/stop_params.dart';
import 'package:gym/repository/stop_repository.dart';

final stopProvider =
    StateNotifierProvider<StopProvider, List<StopModel>>((ref) {
  final repository = ref.watch(stopRepositoryProvider);
  return StopProvider(repository: repository);
});

class StopProvider extends StateNotifier<List<StopModel>> {
  final StopRepository repository;

  StopProvider({
    required this.repository,
  }) : super([]) {
    getStop(const StopParams());
  }

  Future<void> getStop(StopParams stop) async {
    final res = await repository.getStop(stopParams: stop);
    state = res.items;
  }
}
