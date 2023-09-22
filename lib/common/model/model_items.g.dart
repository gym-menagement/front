// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'model_items.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ModelWithItems<T> _$ModelWithItemsFromJson<T>(
  Map<String, dynamic> json,
  T Function(Object? json) fromJsonT,
) =>
    ModelWithItems<T>(
      code: json['code'] as String,
      items: (json['items'] as List<dynamic>).map(fromJsonT).toList(),
      total: json['total'] as int,
    );

Map<String, dynamic> _$ModelWithItemsToJson<T>(
  ModelWithItems<T> instance,
  Object? Function(T value) toJsonT,
) =>
    <String, dynamic>{
      'code': instance.code,
      'items': instance.items.map(toJsonT).toList(),
      'total': instance.total,
    };
