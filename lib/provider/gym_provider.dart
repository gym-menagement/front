import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/gym_model.dart';
import 'package:gym/params/gym_params.dart';
import 'package:gym/repository/gym_repository.dart';

final gymProvider =
    StateNotifierProvider<GymProvider, List<GymModel>>((ref) {
  final repository = ref.watch(gymRepositoryProvider);
  return GymProvider(repository: repository);
});

class GymProvider extends StateNotifier<List<GymModel>> {
  final GymRepository repository;

  GymProvider({
    required this.repository,
  }) : super([]) {
    getGym(const GymParams());
  }

  Future<void> getGym(GymParams gym) async {
    final res = await repository.getGym(gymParams: gym);
    state = res.items;
  }
}
