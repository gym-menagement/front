// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'role_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RoleParams _$RoleParamsFromJson(Map<String, dynamic> json) => RoleParams(
      id: json['id'] as int?,
      gym: json['gym'] as int?,
      role: json['role'] as int?,
      name: json['name'] as String?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$RoleParamsToJson(RoleParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'role': instance.role,
      'name': instance.name,
      'date': instance.date,
    };
