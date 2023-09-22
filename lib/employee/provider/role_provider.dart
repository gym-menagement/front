import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/common/model/model_items.dart';
import 'package:gym/employee/model/role_model.dart';
import 'package:gym/employee/repository/role_repository.dart';

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
    getRole();
  }

  Future<void> getRole() async {
    try {
      final res = await repository.getRole();

      state = res.items;
    } catch (e) {
      print(e);
    }
  }
}
