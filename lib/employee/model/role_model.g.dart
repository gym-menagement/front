// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'role_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RoleModel _$RoleModelFromJson(Map<String, dynamic> json) => RoleModel(
      id: json['id'] as int,
      gym: json['gym'] as int,
      role: json['role'] as int,
      name: json['name'] as String,
      date: DateTime.parse(json['date'] as String),
    );

Map<String, dynamic> _$RoleModelToJson(RoleModel instance) => <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'role': instance.role,
      'name': instance.name,
      'date': instance.date.toIso8601String(),
    };
