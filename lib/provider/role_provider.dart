import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/model/role_model.dart';
import 'package:gym/params/role_params.dart';
import 'package:gym/repository/role_repository.dart';

final roleProvider =
    StateNotifierProvider<RoleProvider, List<RoleModel>>((ref) {
  final repository = ref.watch(roleRepositoryProvider);
  return RoleProvider(repository: repository);
});

class RoleProvider extends StateNotifier<List<RoleModel>> {
  final RoleRepository repository;

  RoleProvider({
    required this.repository,
  }) : super([]) {
    getRole(const RoleParams());
  }

  Future<void> getRole(RoleParams role) async {
    final res = await repository.getRole(roleParams: role);
    state = res.items;
  }
}
