import 'package:gym/user/model/user_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_me_model.g.dart';

abstract class UserMeModelBase {}

class UserMeModelError extends UserMeModelBase {
  final String message;

  UserMeModelError({
    required this.message,
  });
}

class UserMeModelLoading extends UserMeModelBase {}

@JsonSerializable()
class UserMeModel extends UserMeModelBase {
  final String code;
  final UserModel item;

  UserMeModel({
    required this.code,
    required this.item,
  });

  UserMeModel copyWith({
    String? code,
    UserModel? item,
  }) {
    return UserMeModel(
      code: code ?? this.code,
      item: item ?? this.item,
    );
  }

  factory UserMeModel.fromJson(Map<String, dynamic> json) =>
      _$UserMeModelFromJson(json);
}
