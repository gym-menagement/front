import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/usehelth_model.dart';
import 'package:gym/params/usehelth_params.dart';
import 'package:gym/repository/usehelth_repository.dart';

final usehelthProvider =
    StateNotifierProvider<UsehelthProvider, List<UsehelthModel>>((ref) {
  final repository = ref.watch(usehelthRepositoryProvider);
  return UsehelthProvider(repository: repository);
});

class UsehelthProvider extends StateNotifier<List<UsehelthModel>> {
  final UsehelthRepository repository;

  UsehelthProvider({
    required this.repository,
  }) : super([]) {
    getUsehelth(const UsehelthParams());
  }

  Future<void> getUsehelth(UsehelthParams usehelth) async {
    final res = await repository.getUsehelth(usehelthParams: usehelth);
    state = res.items;
  }
}
